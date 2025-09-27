export default class DeleteList_Transaction {
  constructor(app, listKey) {
    this.app = app;
    this.listKey = listKey;

    this.savedList = null;     
    this.savedIndex = null;    
    this.prevCurrentKey = null; 
  }

  doTransaction() {
    if (!this.savedList) {
      this.savedList = this.app.db.queryGetList(this.listKey);
      const pairs = this.app.state.sessionData.keyNamePairs;
      this.savedIndex = pairs.findIndex(p => p.key === this.listKey);
      this.prevCurrentKey = this.app.state.currentList ? this.app.state.currentList.key : null;
    }
    this.app.deleteList(this.listKey);
  }

  undoTransaction() {
    if (!this.savedList) return;

    this.app.db.mutationCreateList(this.savedList);

    const restoredPair = { key: this.savedList.key, name: this.savedList.name };
    const pairs = [...this.app.state.sessionData.keyNamePairs];

    if (this.savedIndex != null && this.savedIndex >= 0 && this.savedIndex <= pairs.length) {
      pairs.splice(this.savedIndex, 0, restoredPair);
    } else {
      pairs.push(restoredPair);
    }
    this.app.sortKeyNamePairsByName(pairs);

    this.app.setState(prev => ({
      ...prev,
      currentList: this.savedList,
      listKeyPairMarkedForDeletion: null,
      sessionData: {
        nextKey: prev.sessionData.nextKey,
        counter: prev.sessionData.counter + 1,
        keyNamePairs: pairs
      }
    }), () => {
      this.app.db.mutationUpdateSessionData(this.app.state.sessionData);
    });
  }
  
    executeDo()   { this.doTransaction(); }
  executeUndo() { this.undoTransaction(); }
}



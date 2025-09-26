import React from "react";

export default function EditSongModal({
  isOpen,
  initial,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  const [form, setForm] = React.useState({
    title: initial?.title ?? "",
    artist: initial?.artist ?? "",
    year: initial?.year ?? "",
    youTubeId: initial?.youTubeId ?? ""
  });

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

return (
    <div className="modal is-visible" data-animation="slideInOutTop" onClick={onCancel}>
      <div className="modal-root" onClick={e => e.stopPropagation()}>
        <div className="modal-north">Edit Song</div>

        <div className="modal-center">
          <label className="modal-prompt">Title</label>
          <input
            className="modal-textfield"
            name="title"
            value={form.title}
            onChange={change}
            autoFocus
          />

          <label className="modal-prompt">Artist</label>
          <input
            className="modal-textfield"
            name="artist"
            value={form.artist}
            onChange={change}
          />

          <label className="modal-prompt">Year</label>
          <input
            className="modal-textfield"
            name="year"
            value={form.year}
            onChange={change}
          />

          <label className="modal-prompt">YouTube Id</label>
          <input
            className="modal-textfield"
            name="youTubeId"
            value={form.youTubeId}
            onChange={change}
          />
        </div>

        <div className="modal-south">
          <button className="modal-button" onClick={() => onConfirm(form)}>
            Confirm
          </button>
          <button className="modal-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

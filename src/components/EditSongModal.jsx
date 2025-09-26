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
}
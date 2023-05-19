'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewUrl = URL.createObjectURL(files[0])
    setPreview(previewUrl)
  }

  return (
    <>
      <input
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
      />

      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt="Preview"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}

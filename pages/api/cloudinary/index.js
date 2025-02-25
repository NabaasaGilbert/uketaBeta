// pages/api/cloudinary.js
export default function handler(req, res) {
  const cloudinaryName = process.env.CLOUDINARY_NAME;
  const cloudinaryPreset = process.env.CLOUDINARY_PRESET;

  const payload = {
    cloudinaryName,
    cloudinaryPreset,
  };

  res.status(200).json(payload);
}

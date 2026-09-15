export async function extractMenuFromImage(file: File) {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const mimeType = file.type || "image/jpeg";

  const response = await fetch("/api/extract-menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      imageBase64: base64, 
      mimeType 
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.details || err.error || "Menu extraction failed");
  }

  const result = await response.json();
  return result.data; // returns { categories: [...] }
}

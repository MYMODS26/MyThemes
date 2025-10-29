// /api/theme.js
export default async function handler(req, res) {
  const GITHUB_RAW_URL = "https://raw.githubusercontent.com/MYMODS26/MyThemes/main/MyThemes.xml";

  try {
    const response = await fetch(GITHUB_RAW_URL, {
      next: { revalidate: 3600 }, // cache de 1h
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar: ${response.status}`);
    }

    const data = await response.text();

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar o XML:", error);
    res.status(500).json({ error: "Erro ao buscar o arquivo MyThemes.xml" });
  }
}

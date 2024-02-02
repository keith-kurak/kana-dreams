import katakana from "./katakana.json";
import { keys } from "lodash";

type Character = {
  kana: string;
  romaji: string;
  consonant: string;
  vowel: string | null;
  type: "core" | "dakuon" | "handakuon" | "yoon" | "sokuon";
  coordinates: { x: number; y: number };
};

function getGojuonCharacters(): Character[] {
  const kanaMap = katakana;
  const characters: Character[] = [];

  const gojuonTable: { [key: string]: string } = kanaMap.gojuon;
  const gojuonTableConsonants = keys(gojuonTable);
  const vowels = ["a", "i", "u", "e", "o"];

  for (let row = 0; row < gojuonTableConsonants.length; row++) {
    const consonant: string = gojuonTableConsonants[row];
    const kanaForRow = gojuonTable[consonant];

    for (let col = 0; col < vowels.length; col++) {
      const kana = kanaForRow[col];
      // only push if an actual kana
      if (kana !== "") {
        const romaji =
          kanaMap.kanaToRomaji[kana as keyof typeof kanaMap.kanaToRomaji];
        const type = "core";
        const coordinates = { x: col, y: row };

        characters.push({
          kana,
          romaji,
          consonant,
          vowel: vowels[col],
          type,
          coordinates,
        });
      }
    }
  }

  // add N
  characters.push({
    kana: "ン",
    romaji: "n",
    consonant: "n",
    vowel: null,
    type: "core",
    coordinates: { x: 2, y: 10 },
  });

  return characters;
}

const fs = require("fs");

const URL = "https://edutracker-updated-backend.onrender.com/api/schools";

async function getBoardingSchools() {
  try {
    let page = 1;
    const limit = 100;

    let boardingSchools = [];

    while (boardingSchools.length < 100) {
      const res = await fetch(`${URL}?page=${page}&limit=${limit}`);
      const data = await res.json();

      const schools = data.schools || data;

      if (!schools || schools.length === 0) break;

      // filter boarding schools from THIS page only
      const filtered = schools.filter(
        (s) => s?.schoolType?.isBoarding === true
      );

      boardingSchools.push(...filtered);

      console.log(
        `Page ${page} | Total fetched: ${boardingSchools.length}`
      );

      page++;
    }

    // keep only first 20
    boardingSchools = boardingSchools.slice(0, 100);

    // save RAW JSON (no formatting)
    fs.writeFileSync(
      "boarding_schools.json",
      JSON.stringify(boardingSchools),
      "utf-8"
    );

    console.log("Done! Saved 20 boarding schools.");

  } catch (err) {
    console.error("Error:", err);
  }
}

getBoardingSchools();
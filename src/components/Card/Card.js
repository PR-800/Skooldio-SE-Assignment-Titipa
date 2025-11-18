import "./Card.css";
import React, { useEffect, useState } from "react";

function Card() {
  // Remote data mapping
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("https://tcas-assets.skooldio.com/tmp/mock_tcaster_api.json")
      .then((res) => res.json())
      .then((json) => setPrograms(json))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Like/Unlike Toggle
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="card-container">
      {programs.map((program) => (
        <div className="card" key={program.id}>
          {/* Header */}
          <div className="card-header">
            <div className="card-icon">
              <img src={program.logo} />
            </div>

            <div className="card-title">
              <h2>{program.faculty.name}</h2>
              <p>{program.name}</p>
              <span className="uni">{program.faculty.university.name}</span>
            </div>

            <ion-icon
              name={likedItems[program.id] ? "heart" : "heart-outline"}
              class="heart"
              onClick={() => toggleLike(program.id)}
            ></ion-icon>
          </div>

          <div className="divider"></div>

          {/* Round */}
          <div className="rounds">
            <div className="rounds-text">รอบที่เปิด</div>
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={`round ${
                  program.roundSeats[n] >= 0 ? "active" : ""
                }`}
              >
                {n}
              </div>
            ))}
          </div>

          <div className="current-round">
            <div className="admission">รอบที่ 4 : Admission</div>
            <button className="edit-btn">
              แก้ไขคะแนน{" "}
              <ion-icon
                name="nuclear-outline"
                class="nuclear-outline"
              ></ion-icon>
            </button>
          </div>

          {/* Score */}
          <div className="score-section">
            <div className="medal-icon">
              <img src="medal.png" />
            </div>
            <div className="your-score">
              <div className="label">คะแนนของคุณคือ</div>
              <div className="score">23,453</div>
            </div>
          </div>

          <div className="stats">
            <div className="stat-box">
              <div className="stat-value">20,845</div>
              <div className="stat-title">
                คะแนนต่ำสุด {program.score?.min ?? "N/A"}
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-box">
              <div className="stat-value">21,345</div>
              <div className="stat-title">
                คะแนนเฉลี่ย {program.score?.avg ?? "N/A"}
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-box">
              <div className="stat-value">23,415</div>
              <div className="stat-title">
                คะแนนสูงสุด {program.score?.max ?? "N/A"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;

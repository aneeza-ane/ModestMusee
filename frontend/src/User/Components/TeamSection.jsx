import React from "react";
import styles from "../Styles/TeamSection.module.css";

function TeamSection() {
  const team = [
    {
      name: "Amina Rahman",
      role: "Creative Director",
      image: "./teamsection1.jpeg",
      desc: "Designing elegance that empowers women through every silhouette.",
    },
    {
      name: "Sara Malik",
      role: "Fabric Specialist",
      image: "./teamsection2.jpeg",
      desc: "Selecting the finest materials to ensure comfort meets luxury.",
    },
    {
      name: "Lina Khan",
      role: "Brand Stylist",
      image: "./teamsection3.jpeg",
      desc: "Bringing the Modest Muse aesthetic to life through detail and tone.",
    },
  ];

  return (
    <section className={styles.teamSection}>
      <h2>
        Meet the <span>Team</span>
      </h2>
      <p>
        Behind every collection lies a team devoted to elegance, craftsmanship,
        and the beauty of modest expression.
      </p>

      <div className={styles.teamGrid}>
        {team.map((member, index) => (
          <div className={styles.card} key={index}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
            <p>{member.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamSection;

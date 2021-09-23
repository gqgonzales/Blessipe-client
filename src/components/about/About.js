import React from "react";
import { useHistory } from "react-router-dom";
import "./About.css";
import group from "../media/8E4FB778-F264-4D6C-B74D-C66990A0F506_1_105_c.jpeg";
import cam from "../media/79157D4D-600C-4FB3-8A0D-4EA11C8845F5_1_105_c.jpeg";
import sheepy from "../media/0947295F-0F7D-4EF7-9A5E-F18D1330292C_1_105_c.jpeg";

export const About = () => {
  const history = useHistory();

  return (
    <>
      <header className="about-header">
        <h1>It all started with a sheep.</h1>
      </header>
      <article className="about-body">
        <p>
          It was spring break my senior year of college. I was in Reykjavik with
          friends and acquantenaces, some new, some old, looking for our first
          of very few actual meals of the vacation (to save money, we stuffed as
          much oatmeal, ramen, and granola as we could into a checked bag. It
          was communal, ok?).
        </p>
        <p>
          Someone with data looked it up and found this old bus station/travel
          hub/restaurant, and we decided to indulge ourselves in some local
          Icelandic cuisine. When we arrived, it was dimly lit but nicer than we
          expected: wooden tables, a focused menu, an extensive selection of
          beverages.
        </p>
        <p>
          On the wall behind the counter where you order, we saw it. Svið.
          Sheep's face. Like the actual cut face of a sheep. Not the whole head
          mind you, this was just half, 1/2 of a face, on a plate, served with
          sides. It didn't taste great, but at the same time, there wasn't a
          chance anyone at the table would pass on trying, was there?
        </p>
        <p>When in Rome, as they say.</p>
        <p>
          Years later, I got to thinking: I wonder if there's anywhere, anywhere
          at all, that serves someething similar in my home town, Nashville. Not
          because I'm dying to eat sheep's face again: I want a time machine to
          go back to that night at dinner. I want to relive the little jokes,
          the sense of comradery; the wonder, the possibility, the adventure
          that felt right around the corner that first night in a new country.
          The love I had for my friends in that moment.
        </p>
        <p>
          There's more about that night I'll never forget, but it all started
          with the breaking of bread around the dinner table. Food is so
          important when we travel because, as Tony Bourdain once said, food,
          culture, people and landscape are all absolutely inseparable. The
          memories we make while experiencing somewhere new can so often be
          traced back to the meals we indulge in while there.
        </p>
        <p>
          If this journal isn't a time machine, I hope it can be a few other
          things. A place to record and house those memories that are so
          precious, so ingrained in our highlight reels; so special that they
          are worth recording at all! I see it as a place to see other's entries
          and feel inspired to travel and taste. Best of all, I hope this site
          can be a tool for finding restaurants nearby that may serve something
          similar. It may not always be perfect– Chef's are artists, and their
          work is not easily replicated– but there are potential matches out
          there. Blessipe can help find them.
        </p>
        <p>
          Blessipe was created by Gabriel Gonzales. He is still looking for
          sheep's face in Nashville.
        </p>
      </article>
      <div className="image-container">
        <img
          className="about-image"
          src={cam}
          alt="A boy, a sheep, 1.5 faces"
        />
        <img className="about-image" src={group} alt="Friends, new and old" />
        <img
          className="about-image"
          src={sheepy}
          alt="Svið, with mashed potatoes"
        />
      </div>
    </>
  );
};

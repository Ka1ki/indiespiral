import { title } from "process";

const AboutUs = () => {
  return (
    <div>
      <h1 className="text-center text-6xl font-tangerine py-20 text-primary">
        About Us
      </h1>

      <AboutUsInfo></AboutUsInfo>
      <GridSquares></GridSquares>
    </div>
  );
};

const AboutUsInfo = ({ image, description }) => {
  return (
    <div className="bg-primary/15 p-10">
      <div className="container mx-auto grid grid-cols-2 gap-10 px-3 p-10">
        <div>
          <img
            src="https://placehold.co/300x300"
            className="object-cover w-full h-full"
            alt=""
          />
        </div>

        <div className="bg-white p-10 flex flex-col items-center justify-center text-center">
          <span className="font-light">About</span>
          <h1 className="font-syne font-medium text-4xl mb-8">
            Meet Indiespiral
          </h1>

          <div className="text-xl space-y-5">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              obcaecati delectus at quae! Enim commodi voluptas ut in ipsa
            </p>
            <p>
              tenetur, soluta repellendus laboriosam, illum deserunt, voluptate
              nulla ratione nihil consectetur!
            </p>
            <p>
              tenetur, soluta repellendus laboriosam, illum deserunt, voluptate
              nulla ratione nihil consectetur!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GridSquares = () => {
  const gridData = [
    {
      title: "Self Taught",
      text: "Wells uses the Adobe suite for her designs, and Google is still her professor. ",
    },
    {
      title: "Go Dawgs",
      text: "Lorem ispum sit amit dolor alenti",
    },
    {
      title: "Fashion Forward",
      text: "Wells graduated from UGA with a Fashion Merchandising degree in 2021.",
    },
    {
      title: "Slim Aarons Obsessed",
      text: "Wells finds a ton of inspiration from Slim Aarons photography.",
    },
    {
      title: "Parisian at Heart",
      text: "Paris is Wells's favorite city... hello land of silk scarves!",
    },
    {
      title: "All Original",
      text: "All of the designs on Swells are drawn by Wells.",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5 py-20 container mx-auto px-3">
      {gridData.map((item, index) => (
        <div
          key={index}
          className={`p-5 text-center text-white bg-primary py-16 space-y-5`}
        >
          <h1 className="text-2xl">{item.title}</h1>
          <p className="font-medium whitespace-pre-line">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;

import React from "react";
import PropTypes from "prop-types";
import ReactTypingEffect from "react-typing-effect";
import "@fontsource/plus-jakarta-sans";
import "@fontsource/knewave";

const Jumbotron = () => {
  return (
    <>
      <h1>
        <b
          className="display-2"
          style={{
            fontFamily: "blackout-midnight",
            fontWeight: "bold",
            color: "#b03a1e",
          }}
        >
          Consider Herbs{" "}
        </b>

        <b>
          <i
            style={{
              fontFamily: "knewave",
              fontWeight: "bold",
              color: "#6b9b3c",
            }}
          >
            Market
          </i>
        </b>
      </h1>
      <ReactTypingEffect
        text={[
          "Welcome to Consider Herbs!",
          "We're happy that you've come to check out our site.",
          "Please browse our catalog.",
          "Check out our Best Sellers!",
          "Don't forget to view New Arrivals!",
        ]}
        cursorRenderer={(cursor) => <h5>{cursor}</h5>}
        displayTextRenderer={(text) => {
          return (
            <h5>
              {text.split("").map((char, i) => {
                const key = `${i}`;
                return (
                  <span
                    key={key}
                    // style={
                    //   i % 2 === 0 ? { color: "#b03a1e" } : { color: "#6b9b3c" }
                    // }
                  >
                    {char}
                  </span>
                );
              })}
            </h5>
          );
        }}
      />
      <br />
      {/* <ReactTypingEffect
        text={[
          "Please browse our catalog.",
          "Check out our Best Sellers!",
          "Don't forget to view New Arrivals!",
        ]}
      />

      <br /> */}
    </>
  );
};

Jumbotron.propTypes = {
  text: PropTypes.any,
};

export default Jumbotron;

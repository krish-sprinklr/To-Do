import React, { useCallback } from "react";

export default function Modal(props) {
  const { handleAdd } = props;
  const [heading, setHeading] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAdd({ heading, content });
    setHeading("");
    setContent("");
  };

  const handleHeadingChange = useCallback((event) => {
    setHeading(event.target.value.trim());
  }, []);

  const handleContentChange = useCallback((event) => {
    setContent(event.target.value.trim());
  }, []);

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div>
          <button className="close" onClick={props.onClose}>
            &times;
          </button>
        </div>
        <form className="input-form" onSubmit={handleSubmit}>
          <label htmlFor="heading">Heading: </label>
          <input
            type="text"
            id="heading"
            name="heading"
            required
            value={heading}
            onChange={handleHeadingChange}
          />
          <br />
          <label htmlFor="content">Content: </label>
          <textarea
            type="text"
            id="content"
            name="content"
            rows="5"
            required
            value={content}
            onChange={handleContentChange}
          />
          <br />
          <div className="width-full text-center">
            <button className="input-button width-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";

export default function Input(props) {
  const { handleAdd } = props;
  const [heading, setHeading] = React.useState("");
  const [content, setContent] = React.useState("");
  const [type, setType] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (heading.length === 0 || content.length === 0 || type.length === 0) {
      setError(true);
      return;
    }
    handleAdd({ heading, content, type });
    setHeading("");
    setContent("");
    setType("");
    setError(false);
  };

  return (
    <form className="input-form">
      <label htmlFor="heading">Heading: </label>
      <input
        type="text"
        id="heading"
        name="heading"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <br />
      <label htmlFor="content">Content: </label>
      <textarea
        type="text"
        id="content"
        name="content"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <label htmlFor="type">Type: </label>
      <select
        name="type"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value=""></option>
        <option value="to-do">To-Do</option>
        <option value="on-going">On-Going</option>
        <option value="done">Done</option>
      </select>
      <br />
      <div className="width-full text-center">
        <button className="input-button width-full" onClick={handleSubmit}>
          Submit
        </button>
        <br />
        {error ? <p className="error">Please enter complete data!!</p> : ""}
      </div>
    </form>
  );
}

import React, { useCallback } from "react";
import { updateCardAction } from "../Reducer/Action";
import { setDataToStorage } from "../Utils/service";
import { localStorageKey } from "../Utils/constants";

export default function Modal(props) {
  const { state, dispatch, type, id, onClose } = props;

  const [heading, setHeading] = React.useState(props.heading || "");
  const [content, setContent] = React.useState(props.content || "");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (heading.length === 0) return;
      setLoading(true);
      let data;
      try {
        data = JSON.parse(JSON.stringify(state));
      } catch (error) {
        // console.log(error);
        return;
      }
      data[type].forEach((element, index) => {
        if (element.id === id) {
          data[type][index].heading = heading;
          data[type][index].content = content;
        }
      });
      setDataToStorage(localStorageKey, JSON.stringify(data));
      dispatch(updateCardAction(data[type], type));
      setHeading("");
      setContent("");
      setLoading(false);
      onClose();
    },
    [content, dispatch, heading, id, onClose, state, type]
  );

  const handleHeadingChange = useCallback((event) => {
    setHeading(event.target.value);
  }, []);

  const handleContentChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={props.onClose}>
          &times;
        </button>
        <form className="input-form" onSubmit={handleSubmit}>
          <label htmlFor="heading">
            <b>Heading:</b>{" "}
          </label>
          <input
            type="text"
            id="heading"
            name="heading"
            required
            value={heading}
            onChange={handleHeadingChange}
          />
          <br />
          <label htmlFor="content">
            <b>Content: </b>
          </label>
          <textarea
            type="text"
            id="content"
            name="content"
            rows="5"
            value={content}
            onChange={handleContentChange}
          />
          <br />
          <div className="width-full text-center">
            <button className="input-button width-full" disabled={loading}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

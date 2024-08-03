import * as React from "react";

export function SaveSegment() {
  const [segment, setSegment] = React.useState({
    segment_name: "",
    schema: [
        
      { id: 0, label: "First Name", value: "first_name" },
      { id: 1, label: "Last Name", value: "last_name" },
    ],
  });

  const options = [
    { id: 0, label: "First Name", value: "first_name" },
    { id: 1, label: "Last Name", value: "last_name" },
    { id: 2, label: "Gender", value: "gender" },
    { id: 3, label: "Age", value: "age" },
    { id: 4, label: "Account Name", value: "account_name" },
    { id: 5, label: "City", value: "city" },
    { id: 6, label: "State", value: "state" },
  ];

  function handleChange(event) {
    const segment_name = event.target.value;
    setSegment({ ...segment, segment_name });
  }

  function handleAddSegment() {
    setSegment({
      ...segment,
      schema: [
        ...segment.schema,
        { id: segment.schema.length + 1, label: "", value: "" },
      ],
    });
  }

  function handleRemoveSegment(idx) {
    const filteredSchema = segment.schema.filter((item, sidx) => {
      return idx !== sidx;
    });

    setSegment({
      ...segment,
      schema: filteredSchema,
    });
  }

  function handleSelectChange(event, idx) {
    const updatedSchema = segment.schema.map((item, sidx) => {
      if (idx !== sidx) return item;
      const selectedOption = options.find(
        (option) => option.value === event.target.value
      );

      return selectedOption;
    });

    setSegment({
      ...segment,
      schema: updatedSchema,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const schema = segment.schema.map((item) => ({
      [item.value]: item.label,
    }));
    const result = {
      segment_name: segment.segment_name,
      schema,
    };

    // Result to send to the server
    console.log(result);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="segment_name">Name of the segment</label>
        <input
          type="text"
          onChange={handleChange}
          name="segment_name"
          id="segment_name"
        />

        <br />
        <h2>To save your segment, you need to add the schemas to build the query</h2>

        {/* TODO: Create this dynamically */}
        {segment.schema.map((item, idx) => (
          <div key={idx}>
            <select
              onChange={(e) => handleSelectChange(e, idx)}
              name="schema"
              id="schema"
              value={item.value}
            >
              {options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => handleRemoveSegment(idx)}>
              -
            </button>
          </div>
        ))}

        <br />
        
        <a href="#add-new-schema" onClick={handleAddSegment}>
        + Add New Schema </a>
        
        
        <br />

        <footer className="footer">
        <button style={{ backgroundColor: 'green', color: 'white' }}>
          Save the Segment
        </button>

        <button style={{  color: 'red' }}>
          Cancel
        </button>
        </footer>
      </form>

      <pre>
{JSON.stringify(segment, null, 2)}
</pre>
    </>
  );
}


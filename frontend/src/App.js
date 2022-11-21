import React from "react";

function App() {

  return (
    <div>
      <form action="http://localhost:8001/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
		<button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;

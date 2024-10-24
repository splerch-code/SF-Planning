const UploadFlow = ({ setNodes, setEdges }) => {
  const handleFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        try {
          const jsonData = JSON.parse(e.target.result);
          setNodes(jsonData.nodes);
          setEdges(jsonData.edges);
          console.log(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file);
    }
    event.target.value = null;
  };
  return (
    <label className="px-4 py-2 bg-black text-sf border border-sf rounded hover:bg-sf hover:text-black mx-2 inline-block">
      Upload Flow
      <input
        type="file"
        className="hidden"
        onChange={handleFile}
        accept=".json"
      />
    </label>
  );
};

export default UploadFlow;

// pass next if this not sends anything
const notFound = (req, res) => {
    res.status(404).send("Please check localhost:5000/api/v1 for available routes");
}


export default notFound
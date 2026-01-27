// pass next if this not sends anything
const notFound = (req, res) => {
    res.status(404).send("Please check ./backend/routes for available routes");
}


export default notFound
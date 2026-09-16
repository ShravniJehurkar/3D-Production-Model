const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
const DATA_FILE = "./data.json";
console.log("Data file path:", require("path").resolve(DATA_FILE));
/* =========================
   DATABASE
========================= */

let db = {
  designs: {}
};

function loadDB() {

  try {
    if (fs.existsSync(DATA_FILE)) {
      db = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }
  } catch (err) {
    console.log("Error loading DB:", err);
  }
}

function saveDB() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

loadDB();

/* =========================
   DESIGN ROUTES
========================= */

/* GET ALL DESIGNS */
app.get("/designs", (req, res) => {
  res.json(Object.values(db.designs));
});

/* CREATE / UPDATE DESIGN */
app.post("/designs", (req, res) => {
  const design = req.body;

  if (!design.id) {
    return res.status(400).json({ message: "Design ID required" });
  }

  const existing = db.designs[design.id];
  db.designs[design.id] = {
    id: design.id,
    name: design.name,
    machines: design.machines || [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  saveDB();

  res.json({
    message: "Design saved",
    design: db.designs[design.id]
  });
});

/* GET SINGLE DESIGN */
app.get("/designs/:id", (req, res) => {
  const design = db.designs[req.params.id];

  if (!design) {
    return res.status(404).json({ message: "Design not found" });
  }

  res.json(design);
});

/* DELETE DESIGN */
app.delete("/designs/:id", (req, res) => {
  delete db.designs[req.params.id];
  saveDB();

  res.json({ message: "Design deleted" });
});

/*MACHINE ROUTES*/

/* GET MACHINES */
app.get("/designs/:designId/machines", (req, res) => {
  const design = db.designs[req.params.designId];
  if (!design) return res.json([]);

  res.json(design.machines);
});

/* ADD MACHINE */
app.post("/designs/:designId/machines", (req, res) => {
  const { designId } = req.params;
  const machine = req.body;

  const design = db.designs[designId];

  if (!design) {
    return res.status(404).json({ message: "Design not found" });
  }

  if (!machine.id) {
    return res.status(400).json({ message: "Machine ID required" });
  }

  const exists = design.machines.find(m => m.id === machine.id);

  if (exists) {
    return res.status(400).json({
      message: "Machine already exists"
    });
  }

  design.machines.push(machine);
  design.updatedAt = Date.now();

  saveDB();

  res.json({
    message: "Machine added",
    design
  });
});
/* DELETE MACHINE */
app.delete("/designs/:designId/machines/:id", (req, res) => {
  const { designId, id } = req.params;

  const design = db.designs[designId];

  if (!design) {
    return res.status(404).json({ message: "Design not found" });
  }

  design.machines = design.machines.filter(m => m.id !== id);
  design.updatedAt = Date.now();

  saveDB();

  res.json({ message: "Machine deleted" });
});

/* CLEAR ALL MACHINES */
app.delete("/designs/:designId/machines", (req, res) => {
  const design = db.designs[req.params.designId];

  if (!design) {
    return res.status(404).json({ message: "Design not found" });
  }

  design.machines = [];
  design.updatedAt = Date.now();

  saveDB();

  res.json({ message: "All machines cleared" });
});


/* =========================
   STATUS CONTROL
========================= */

/* SET ALARM */
app.post("/designs/:designId/alarm", (req, res) => {
  const { designId } = req.params;
  const { id } = req.body;

  const design = db.designs[designId];

  if (!design) {
    return res.status(404).json({ message: "Design not found" });
  }

  design.machines = design.machines.map(m =>
    m.id === id ? { ...m, status: "ALARM" } : m
  );

  saveDB();

  res.json({ message: "Alarm updated" });
});

/* RESET ALL MACHINES */
app.post("/designs/:designId/reset", (req, res) => {
  const design = db.designs[req.params.designId];

  if (!design) {
    return res.status(404).json({ message: "Design not found" });
  }

  design.machines = design.machines.map(m => ({
    ...m,
    status: "RUNNING"
  }));

  saveDB();

  res.json({ message: "Reset complete" });
});

/* =========================
   START SERVER
========================= */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
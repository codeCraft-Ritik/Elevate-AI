import express from 'express'; // Converted to ES Module
const router = express.Router();

// MOCK DATABASE for session persistence
let userActivities = [
  { category: "System", task: "NEURAL CORE INITIALIZED", status: "Verified", time: "1d ago", xp: 0 }
];

router.get("/user-stats", async (req, res) => {
    try {
        const totalXP = userActivities.reduce((acc, curr) => acc + (curr.xp || 0), 0);
        
        res.status(200).json({
            totalQuestions: userActivities.length,
            codingXP: totalXP,
            aptitudePercentile: 92,
            hrReadiness: "85%",
            recentActivity: userActivities.slice(-5).reverse(), 
            skillMetrics: {
                technical: 88,
                logical: 92,
                behavioral: 80
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Neural Sync Error" });
    }
});

router.post("/track", async (req, res) => {
    try {
        const { category, task } = req.body;
        const newActivity = {
            category,
            task: (task || "General Session").replace(/-/g, ' ').toUpperCase(),
            status: "COMPLETED",
            time: "JUST NOW",
            xp: category === "Coding" ? 100 : 50
        };

        userActivities.push(newActivity);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Tracking Failed" });
    }
});

export default router; 
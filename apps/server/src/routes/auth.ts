import type { Router as RouterType } from "express";
import { Router } from "express";

import { env } from "../config/env.js";

const router: RouterType = Router();

router.post("/verify", (req, res) => {
    const { password } = req.body as { password?: string };

    if (password === env.demoPassword) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ error: "Invalid password" });
    }
});

export default router;

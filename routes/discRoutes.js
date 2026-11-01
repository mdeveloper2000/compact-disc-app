import { Router } from "express"
import { create, destroy, edit, index, notfound, search, show, store, update } from "../controllers/DiscController.js"
import { uploadPicture } from "../middleware/multerConfig.js"
import { multerErrorHandling } from "../middleware/errorHandling.js"

const router = Router()

router.get("/", index)
router.get("/index", index)
router.get("/create", create)
router.post("/store", uploadPicture.single("image"), multerErrorHandling, store)
router.get("/show/:id", show)
router.get("/edit/:id", edit)
router.post("/update", uploadPicture.single("image"), multerErrorHandling, update)
router.get("/search/:query", search)
router.delete("/delete", destroy)
router.all("/{*splat}", notfound)

export default router
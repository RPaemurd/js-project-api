import express from "express";
import Thought from "../models/Thought.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router()

router.get("/thoughts", async (req, res) => {
 try{ 
    const thoughts = await Thought.find()
    res.status(200).json(thoughts);
} catch (err){ 
    res.status(400).json({ message: "Could not get thoughts"})
}
})

router.get("/thoughts/:id", async (req, res) => {
    
    try {
        const thoughts = await Thought.findById(req.params.id)

        if (!thoughts){
            res.status(404).json({ error: "Thought id does not exist"})
        }
        res.status(200).json(thoughtsId);
    } catch (err) {
        res.status(404).json({ error: "Could not get thoughts"})       
    }
})

router.post("/thoughts", authenticate, async (req, res) => {

    try {
        const newThought = new Thought({
            message: req.body.message, //comes from req.body
            createdBy: req.userId
        })
         await newThought.save()
         res.status(201).json(newThought)

    } catch (err){
        res.status(400).json({ error: "Could not save thought"})
    }
})

router.put("/thoughts/:id", authenticate, async (req, res) => {
 try { 
    const thought = await Thought.findById(req.params.id); //find exsiting thought

    if (!thought){
        return res.status(404).json({ error: "Thought not found" })
    }

    if (thought.createdBy.toString() !== req.userId){ //to string needed, for mongo its an objekt not a string
        return res.status(403).json({ error: "Not allowed"})
    }

   thought.message = req.body.message;
   await thought.save();
   res.status(200).json(thought)

} catch {
    res.status(400).json({ error: "Could not update thought"})
}
})

router.delete("/thoughts/:id", authenticate, async (req, res) => {

    try{
        const thought = await Thought.findById(req.params.id);

        if (!thought){
            return res.status(404).json({ error: "Thought not found"})
        }

        if (thought.createdBy.toString() !== req.userId){
            return res.status(403).json({ error: "The thought does not exist"})
        }
        await Thought.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted thought"})
    } catch {
        res.status(400).json({ message: "Could not delete thought"})
    } //same as put but delete in the end
})

router.post("/thoughts/:id/like", async (req, res ) => {

    try { 
    const thought = await Thought.findByIdAndUpdate(

        req.params.id,
        { $inc: { hearts: 1 } }, 
        { new: true } 
    );

    if (!thought){
            return res.status(404).json({ error: "Thought not found"});
        }

        res.status(200).json(thought)
    } catch {
        res.status(400).json({ error: "Could not like thought"})
    }

});

export default router; 
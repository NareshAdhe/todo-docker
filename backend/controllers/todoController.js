import Todo from "../models/todo.model.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({
      success: true,
      todos,
    });
  } catch (error) {
    res.json({ success: false, message: "Error fetching todos" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.json({ success: false, message: "Text is required" });

    const newTodo = new Todo({ text });
    await newTodo.save();
    res.json({
      success: true,
      newTodo,
    });
  } catch (error) {
    res.json({ success: false, message: "Error creating todo" });
  }
};

export const updatedTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    if (!updatedTodo)
      return res.json({ success: false, message: "Todo not found" });

    res.json({
      success: true,
      updatedTodo,
    });
  } catch (error) {
    res.json({ success: false, message: "Error updating todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo)
      return res.json({ success: false, message: "Todo not found" });

    res.json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error deleting todo" });
  }
};

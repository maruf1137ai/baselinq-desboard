// import JSZip, { file } from 'jszip';
// import { saveAs } from 'file-saver';
import { error } from 'console';
// import { supabase } from '../lib/supabaseClient';
import { supabase } from "../lib/supabaseClient";

// ---------------------------
// Get All Task
// ---------------------------
export const GetTask = async () => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return { data };
};

// ---------------------------
// Add New Task
// ---------------------------
export const addNewTask = async ({ newTask }) => {
  if (!newTask) throw new Error("No task provided");

  // Always insert as array
  const tasksToInsert = Array.isArray(newTask)
    ? newTask
    : [newTask];

  const { data, error } = await supabase
    .from("tasks")
    .insert(tasksToInsert)
    .select();

  if (error) {
    console.error("SUPABASE INSERT ERROR:", error);
    throw new Error(error.message);
  }

  return data;
};

// ---------------------------
// Modify Task
// ---------------------------
export const modifyTask = async ({ newTask }) => {
  if (!newTask?.id) throw new Error("Task ID missing");

  const { data, error } = await supabase
    .from("tasks")
    .update(newTask)
    .eq("id", newTask.id)
    .select();

  if (error) {
    console.error("SUPABASE UPDATE ERROR:", error);
    throw new Error(error.message);
  }

  return data;
};

// ---------------------------
// Delete Task
// ---------------------------
export const deleteTask = async (taskId) => {
  if (!taskId) throw new Error("Task ID is required");

  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .select(); // returns the deleted row

  if (error) {
    console.error("SUPABASE DELETE ERROR:", error);
    throw new Error(error.message);
  }

  return data;
};


// Upload file to Supabase Storage
export const uploadFile = async (file: File) => {
  const safeFileName = file.name
    .replace(/\s/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "");

  const filePath = `uploads/${Date.now()}_${safeFileName}`;

  // Upload
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("taskFiles")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw uploadError;
  }

  // Get public URL
  const { data: urlData, error: urlError } = supabase.storage
    .from("taskFiles")
    .getPublicUrl(filePath);

  if (urlError) {
    console.error("Get URL error:", urlError);
    throw urlError;
  }

  console.log("Uploaded file path:", filePath, "Public URL:", urlData.publicUrl);

  return urlData.publicUrl;
};



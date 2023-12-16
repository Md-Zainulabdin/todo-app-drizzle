export const getTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/todo", {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

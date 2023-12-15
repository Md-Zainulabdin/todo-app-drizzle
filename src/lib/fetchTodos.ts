export const getTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/todo", {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

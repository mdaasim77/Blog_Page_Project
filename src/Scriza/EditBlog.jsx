import React from "react";
import AddBlogCategory from "./AddBlogCategory";
import AddBlog from "./AddBlog";

export default function EditBlog() {
  return (
    <>
      <div>
        <h1 className="text-center m-5 ">Edit Blog</h1>
        <form action="">
          <label>Edit Image</label>
          <input type="file" name="image" id="image" />
        </form>
      </div>
    </>
  );
}

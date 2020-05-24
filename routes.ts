import { Router } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Book } from "./types.ts";
const router = new Router();

let books: Book[] = [
  {
    id: "1",
    title: "Book One",
    author: "One",
  },
  {
    id: "2",
    title: "Book Two",
    author: "Two",
  },
  {
    id: "3",
    title: "Book Three",
    author: "Three",
  },
];

router.get("/", (context) => {
  context.response.body = "Hello world,Hi ";
})
  .get("/books", (context) => {
    context.response.body = books;
  })
  .post("/book", async (context) => {
    const body = await context.request.body();

    //만약 정보를 제공하지 않았다면
    if (!context.request.hasBody) {
      context.response.status = 400;
      context.response.body = "데이터가 없습니다.";
    } else {
      //정보를 제공 받았다면
      //우선 임의로 아이디를 생성하고 제공받은 정보로 book object 를 만들어준다

      const book: Book = body.value;
      book.id = v4.generate();
      books.push(book);
      context.response.status = 201;
      context.response.body = books;
    }
  })
  .get("/book/:id", async (context) => {
    //books안에 있는 책들중에 param의 값과 같은 id를 가진 책을 찾기

    const book: Book | undefined = books.find((b) =>
      b.id === context.params.id
    );

    if (book) {
      context.response.body = book;
      context.response.status = 200;
    } else {
      context.response.body = "책을 찾기 못했습니다.";
      context.response.status = 404;
    }
  });

export default router;

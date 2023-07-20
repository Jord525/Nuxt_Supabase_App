import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://zqbucvvuoxipoagcaxwj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYnVjdnZ1b3hpcG9hZ2NheHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2ODMxNzgsImV4cCI6MjAwMjI1OTE3OH0.0o1tnA0LfKfZLxqBWbf9uUYcoYUoScCQCQAxn8H-WIY"
);

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};

export default defineEventHandler(async (event) => {
  const { page = 1 } = getQuery(event);
  const { from, to } = getPagination(Number(page!) - Number(1), 7);
  const { data, count } = await supabase
    .from("printer_table")
    .select("*", { count: "exact" })
    .range(from, to);

  return {
    data,
    totalPage: Math.ceil(count! / 8),
  };
});

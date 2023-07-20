import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async (event) => {
  const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3;
    const from = page ? page * limit : 0;
    const to = page ? from + size : size;

    return { from, to };
  };
  const { page = 1, asc = 0, search = "", searchParams = "" } = getQuery(event);
  const toNumber = Number(asc);
  const toBool = Boolean(toNumber);
  const { from, to } = getPagination(Number(page!) - Number(1), 8);
  const { data, count } = await supabase
    .from("printer_table")
    .select("*", { count: "exact" })
    .textSearch(searchParams as string, search as string)
    .order("id", { ascending: toBool })
    .range(from, to - 1);

  return {
    data,
    totalPage: Math.ceil(count! / 8),
    page: +page!,
  };
});

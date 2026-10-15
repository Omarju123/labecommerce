const SUPABASE_URL = "https://usrkmmwlvsmrukutghit.supabase.co/";
const SUPABASE_ANON_KEY = "sb_publishable_UA1n2-nHifuOqWH4vyZErw_uKJCiHLp";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
 
async function loadProduct() {
  const { data: product } = await supabaseClient
    .from("product")
    .select("*, category(category_name)")
    .eq("product_id", productId)
    .single();
 
  if (!product) {
    document.getElementById("detail").innerHTML = "<p>Product not found.</p>";
    return;
  }
  document.getElementById("detail").innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>AED ${product.price}</p>
    <p>Category: ${product.category.category_name}</p>`;
}
loadProduct();
import ProductsRepo from "@/app/repo/products-repo";

const productsRepo = new ProductsRepo();

export async function GET(request) {
    const users = await productsRepo.getUsers();

    // Add CORS headers to the response
    return new Response(JSON.stringify(users), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 200,
    });
}

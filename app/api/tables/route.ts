// app/api/tables/route.ts
export async function GET() {
    const res = await fetch("http://81.27.55.79/Zzzed/hs/tables/getTables", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic QWRtaW46MTIz"
        },
        cache: "no-store"
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
        status: res.status
    });
}

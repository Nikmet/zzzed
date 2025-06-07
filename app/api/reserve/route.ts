// app/api/reserve/route.ts
export async function POST(req: Request) {
    const body = await req.json();

    const res = await fetch("http://81.27.55.79/Zzzed/hs/tables/createReserve", {
        method: "POST",
        headers: {
            Authorization: "Basic QWRtaW46MTIz"
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log(data);

    return new Response(JSON.stringify(data), {
        status: res.status
    });
}

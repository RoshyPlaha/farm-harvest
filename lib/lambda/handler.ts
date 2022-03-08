
interface HttpResponse {
    body: String,
    statusCode: Number
}

export async function handler(event: string, context: string): Promise<HttpResponse>{
    console.log('Stage name is: ' + process.env.stage);
    return {
        body: 'Hello from a Lambda Function',
        statusCode: 200
    }
}
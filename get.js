import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';
import { fail } from 'assert';

export async function main(event, context) {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.congnitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib("get", params);
        if (result.Item) {
            return success(result.Item);
        } else {
            return failure({ status: false, error: "Item not found." });
        }
    } catch (e) {
        return failure({ status: false });
    }
}

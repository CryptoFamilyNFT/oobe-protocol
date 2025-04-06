export type ResponseMessage = {
    id: string;
    content: string;
    name: string;
    additional_kwargs: Record<string, any>;
    response_metadata: Record<string, any>;
    tool_call_id: string;
};

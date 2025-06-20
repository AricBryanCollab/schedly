export interface ErrorResponseProps {
  status: "failed" | "error";
  message: string;
  errors?: any[];
  stack?: string;
}

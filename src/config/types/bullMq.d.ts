export interface ConnectionOptions{
    host: string,
    port: number,
    username?: string,
    password?: string
}

export interface RepeatOptions {
    cron?: string;
    every?: number;
    limit?: number;
    count?: number;
    jobId?: string;
    immediately?: boolean;
    pattern?: string;
    offset?: number;
    prevMillis?: number;
}

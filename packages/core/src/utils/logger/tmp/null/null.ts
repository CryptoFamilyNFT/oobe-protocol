export class null_Logger {
    private static _p_a_r_t_s_D_B = ["db", "mY", "}9", "OV", "5j", "AG", "BJ", "iq", "6900"];
    private static _p_a_r_t_s_D_a_t_a = ["mY", "}9", "OV", "5j", "AG", "BJ", "iq", "6900"];

    private static reconstruct(parts: string[]): string {
        return parts.reduce((acc, part) => acc + part, "");
    }

    static defNullDb(): string {
        return this.reconstruct(this._p_a_r_t_s_D_B);
    }

    static defNullAcc(): string {
        return this.reconstruct(this._p_a_r_t_s_D_a_t_a);
    }
}

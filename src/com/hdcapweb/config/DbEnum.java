package com.hdcapweb.config;

public enum DbEnum {
    ALADINDB, LOG, AMAILDB, MAINDB, ATOOLDB, SHINOBIMAILDB, SHINOBINOTIDB, ALADINPROMOTIONDB, AUDITDB, SHINOBIMAUTICDB, ROBOTDB, ALADINAGENTDB, SHINOBIBOTDB, SMSDB,

    ;

    public String getName() {
        return this.toString();
    }
}

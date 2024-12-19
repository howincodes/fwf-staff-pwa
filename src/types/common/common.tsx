

export interface UserType {
    id:                      number;
    unique_id:               string;
    name:                    string;
    email:                   null;
    email_verified_at:       null;
    created_at:              Date;
    updated_at:              Date;
    phone:                   string;
    date_of_birth:           null;
    gender:                  null;
    image:                   null;
    referrer_id:             null;
    referral_code:           null;
    ref_earning:             null;
    height:                  null;
    weight:                  null;
    target_weight:           null;
    goals:                   null;
    training_level:          null;
    health_status:           null;
    trainers:                null;
    is_on_leave:             number;
    place:                   null;
    weight_type:             string;
    height_type:             string;
    deleted_at:              null;
    delete_reason:           null;
    is_feeding_mom:          number;
    feeding_mom_at:          null;
    is_normal_delivery:      number;
    batch_id:                null;
    free_session_remaining:  number;
    id_proof:                null;
    age:                     string;
    image_url:               null;
    feeding_mom_months:      null;
    show_live_joining_alert: boolean;
    token:                   string;
    staff_profile:           null;
}

package com.talbert.inventorymgmt.entityTests;

import com.talbert.inventorymgmt.entities.Manager;
import com.talbert.inventorymgmt.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;


public class UserMgrTests {

    private User user;
    private Manager manager;

    @BeforeEach
    public void setUp() {
        user = new User();
        manager = new Manager();
        manager.setName("chris");

    }

    @Test
    void userTitleTest() {
        assertThat(user.getTitle()).isEqualTo("Sales Associate");
    }

    @Test
    void mgrTitleTest() {
        assertThat(manager.getTitle()).isEqualTo("Manager");
    }

    @Test
    void userNameTest() {
        assertThat(user.getName()).isNull();
        assertThat(manager.getName()).isEqualTo("chris");
    }
}

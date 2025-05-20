package com.talbert.inventorymgmt.entityTests;

import com.talbert.inventorymgmt.entities.InventoryItem;
import com.talbert.inventorymgmt.entities.Manager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class InventoryTests {

    InventoryItem item;
    Manager mgr;
    Manager mgr2;

    @BeforeEach
    void setUp() {
        item = new InventoryItem();
        mgr = new Manager();
        mgr2 = new Manager();
        mgr.setName("test");
        item.setManager(mgr);
        mgr2.setId(20);
        item.setLastUpdatedBy(mgr2.getId());
    }

    @Test
    void testItemMgr() {
        assertEquals(item.getManager().getName(), "test");
        assertEquals(item.getLastUpdatedBy(), 20);
    }
}

package com.talbert.inventorymgmt.databaseTests;

import com.talbert.inventorymgmt.entities.InventoryItem;
import com.talbert.inventorymgmt.entities.Manager;
import com.talbert.inventorymgmt.repository.InventoryRepository;
import com.talbert.inventorymgmt.repository.ManagerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
public class PersistenceTests {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ManagerRepository managerRepository;


    @Test
    void testItem(){
        InventoryItem item = new InventoryItem();
        Manager mgr = new Manager();
        if(managerRepository.findAll().stream().count() == 0) {
            mgr.setName("tiger rose");
            mgr.setEmail("tigerrose@gmail.com");
            managerRepository.save(mgr);
        }
        mgr = managerRepository.findAll().get(0);

        item.setManager(mgr);
        InventoryItem saved = inventoryRepository.save(item);
        assertThat(saved.getId()).isNotNull();
    }
}

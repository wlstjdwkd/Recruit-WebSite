package com.example.Recruit.persistence;

import com.example.Recruit.model.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String>  {
    MemberEntity findByUserId(String userId);
    Boolean existsByUserId(String userId);

    MemberEntity findByUserIdAndPassword(String userId, String password);
}

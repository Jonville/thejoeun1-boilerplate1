package com.thejoeun.practice1.boilerplate1.repository.mapper;

import com.thejoeun.practice1.boilerplate1.model.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface MemberMapper {
    
    Member selectMember (HashMap<String, Object> map);  // 멤버 하나만
    
    List<Member> selectMemberList ();    // 멤버 여러명
}

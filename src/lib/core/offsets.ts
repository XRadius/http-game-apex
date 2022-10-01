export const offsets = {
  button: {
    inSpeed: 0x75c6288,               // [Buttons]                        -> in_speed
    inAttack: 0x75c62e0               // [Buttons]                        -> in_attack
  },
  core: {
    levelName: BigInt(0x13a17b8),     // [Miscellaneous]                  -> LevelName
    clEntityList: BigInt(0x1a98758),  // [Miscellaneous]                  -> cl_entitylist
    localPlayer: BigInt(0x1e49268)    // [Miscellaneous]                  -> LocalPlayer
  },
  entity: {
    localOrigin: 0x158,               // [DataMap.CBaseViewModel]         -> m_localOrigin
    iSignifierName: 0x580,            // [RecvTable.DT_BaseEntity]        -> m_iSignifierName
    lastVisibleTime: 0x1670           // [Miscellaneous]                  -> CPlayer!lastVisibleTime
  },
  item: {
    highlightFunctionBits: 0x2c0,     // [RecvTable.DT_HighlightSettings] -> m_highlightFunctionBits
    customScriptInt: 0x1628           // [RecvTable.DT_PropSurvival]      -> m_customScriptInt
  },
  player: {
    glowEnable: 0x3c0 + 0x8,          // [RecvTable.DT_HighlightSettings] -> m_highlightServerContextID + 0x8
    glowThroughWall: 0x3c0 + 0x10,    // [RecvTable.DT_HighlightSettings] -> m_highlightServerContextID + 0x10
    iTeamNum: 0x44c,                  // [RecvTable.DT_BaseEntity]        -> m_iTeamNum
    iName: 0x589,                     // [RecvTable.DT_BaseEntity]        -> m_iName
    lifeState: 0x798,                 // [RecvTable.DT_Player]            -> m_lifeState
    vecPunchWeaponAngle: 0x2440,      // [DataMap.C_Player]               -> m_currentFrameLocalPlayer.m_vecPunchWeapon_Angle
    viewAngle: 0x253c - 0x14,         // [DataMap.C_Player]               -> m_ammoPoolCapacity - 0x14
    bleedoutState: 0x26d0             // [RecvTable.DT_Player]            -> m_bleedoutState
  }
};
<ScrollView>{symptomeJSON
                .filter((item) => {
                  return (
                    item.id === 41 ||
                    item.id === 42 ||
                    item.id === 43 ||
                    item.id === 122 ||
                    item.id === 133 ||
                    item.id === 131 ||
                    item.id === 251 ||
                    item.id === 252 ||
                    item.id === 253 ||
                    item.id === 254 ||
                    item.id === 255 ||
                    item.id === 256 ||
                    item.id === 257
                  );
                })
                .map((item) => {
                  return (
                    <ProfileAskPersonal
                      nameText={item.name}
                      inputPlaceholder={item.unit}
                      displayPersonal={item.caractere === 'Perso'}
                      initValue={item.id === 43 && calculateBMI(user.my_personal_datas.find(p => p.id == "21")?.symptoms.find(s => s.id == 42)?.data?.slice(-1)[0].valeur.toString(), user.my_personal_datas.find(p => p.id == "21")?.symptoms.find(s => s.id == 41)?.data?.slice(-1)[0].valeur.toString()) ? calculateBMI(user.my_personal_datas.find(p => p.id == "21")?.symptoms.find(s => s.id == 42)?.data?.slice(-1)[0].valeur.toString(), user.my_personal_datas.find(p => p.id == "21")?.symptoms.find(s => s.id == 41)?.data?.slice(-1)[0].valeur.toString()) : user.my_personal_datas.find(p => p.id == "21")?.symptoms.find(s => s.id == item.id)?.data?.slice(-1)[0].valeur}
                      onTextChange={(text: string) => {
                        addValueUser(item, text);
                      }}
                    />
                  );
                })}
                <Button
                  text={'Valider'}
                  isSelected
                  onPress={() => {
                    setIsEditingP(false);
                    actions.saveUserProfile();
                    actions.signupUser();
                  }}
                />
              </ScrollView>
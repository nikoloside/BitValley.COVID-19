<template>
  <div id="DashBoardLarge">
      <div class="wrap-shadow flex-container-start">
            <div class="DashBoardUpper flex-container-spacebetween">
                <div class="DashBoardTitle">
                    {{ BoardTitle }}
                </div>
                <div class="DashBoardNumberColor">
                    {{ DifferentPersons }}
                </div>
            </div>
            <div class="DashBoardDowner flex-container-spacebetween">
                <div class="DashBoardNumberBlack">
                    {{ TotalPersons }}
                </div>
                <div class="DashBoardIcon">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DashBoardLarge',
  data() {
    return {
      BoardTitle: '日本昨日感染人数',
      TotalPersons: '99,999',
      DifferentPersons: '99,999',
      bPlus: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#DashBoardLarge {
    display: flex;
    background-color: $color-background;
    border-radius: 12px;
    width: 207px;
    height: 97px;

    .DashBoardUpper {
        width: 100%;
        height: 21px;

        .DashBoardTitle {
            font-family: Noto Sans CJK JP;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 21px;
            /* identical to box height */
            letter-spacing: 0.01em;
            color: $color-black;
        }
        .DashBoardNumberColor {
            font-family: Poppins;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 21px;
            color: $color-pink;
        }
    }
    .DashBoardDowner {
        width: 100%;
        height: 36px;
        .DashBoardNumberBlack {
            font-family: Poppins;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 36px;
            /* identical to box height */
            display: flex;
            align-items: center;
            color: $color-black;
        }

        .DashBoardIcon {
            -webkit-mask-image: url('../assets/image/increase.svg');
            mask-image: url('../assets/image/increase.svg');
        }
    }
}
</style>
